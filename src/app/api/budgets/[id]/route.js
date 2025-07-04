import dbConnect from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function PUT(request, { params }) {
  await dbConnect();
  const { amount } = await request.json();
  const { id } = params;

  const updated = await Budget.findByIdAndUpdate(id, { amount }, { new: true });
  if (!updated) {
    return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await dbConnect();
  const { id } = params;

  const deleted = await Budget.findByIdAndDelete(id);
  if (!deleted) {
    return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
  }

  return Response.json({ message: "Budget deleted" });
}
