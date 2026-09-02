import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Parse the requested date from the request body
    const body = await req.json();
    const date = body?.date;

    // Validate the date format (YYYY-MM-DD)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return Response.json(
        { error: "A valid date (YYYY-MM-DD) is required." },
        { status: 400 }
      );
    }

    // Query appointments for this date using the service role (bypasses RLS).
    // Exclude cancelled appointments so their slots become available again.
    const appointments = await base44.asServiceRole.entities.Appointment.filter({
      date: date,
      status: { $ne: "cancelled" },
    });

    // Return ONLY the time_slot values — never names, emails, phones, state, or notes.
    const bookedSlots = appointments
      .map((a) => a.time_slot)
      .filter((slot) => Boolean(slot));

    return Response.json({ date, bookedSlots });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to retrieve availability." },
      { status: 500 }
    );
  }
}