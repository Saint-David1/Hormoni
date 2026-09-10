-- 1. cycles.flow: the tracker UI has always collected a flow level (Light/Medium/
--    Heavy/Spotting) but the original schema had nowhere to store it.
ALTER TABLE public.cycles ADD COLUMN IF NOT EXISTS flow TEXT;

-- 2. guidance_requests: the original "FOR ALL" policy let a patient update their
--    own request's status/responded_at/provider_id, which should only ever be set
--    by the responding provider. Replace it with narrower per-action policies for
--    the requesting user, and add a real path for providers to see and respond to
--    requests routed to them.
DROP POLICY IF EXISTS "Users can manage their own guidance requests" ON public.guidance_requests;

CREATE POLICY "Users can view their own guidance requests" ON public.guidance_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own guidance requests" ON public.guidance_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own pending guidance requests" ON public.guidance_requests
  FOR DELETE USING (auth.uid() = user_id AND status = 'pending');

-- Link providers to an auth account so RLS can identify "the provider" for a row.
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS provider_user_id UUID REFERENCES auth.users(id);

CREATE POLICY "Providers can view requests routed to them" ON public.guidance_requests
  FOR SELECT USING (
    provider_id IN (SELECT id FROM public.providers WHERE provider_user_id = auth.uid())
  );

CREATE POLICY "Providers can respond to requests routed to them" ON public.guidance_requests
  FOR UPDATE USING (
    provider_id IN (SELECT id FROM public.providers WHERE provider_user_id = auth.uid())
  );
