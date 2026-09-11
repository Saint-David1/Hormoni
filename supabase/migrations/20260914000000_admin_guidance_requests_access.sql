-- guidance_requests already has policies for the owning user and for a
-- provider explicitly routed to a request (provider_id -> providers ->
-- provider_user_id), but nothing lets an admin see requests generally —
-- "Speak to a Doctor" writes real rows here but the admin panel has had no
-- way to view them, so the promised follow-up had no operational backend.
CREATE POLICY "Admins can view guidance requests" ON public.guidance_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can update guidance requests" ON public.guidance_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
  );
