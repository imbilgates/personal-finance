import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function DELETE(request, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }

    return Response.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function PUT(request, context) {
  const { id } = context.params;
  const body = await request.json();
  const { amount, description, date, category } = body;

  await dbConnect();

  try {
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { amount, description, date, category },
      { new: true }
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }

    return Response.json(updated);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}

