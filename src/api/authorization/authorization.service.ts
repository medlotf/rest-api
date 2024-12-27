import { Role, RoleRequestStatus } from "@prisma/client";
import db from "./../../db";

export async function requestRoleChange(userId: number, role: Role) {
  const user = await db.user.findUnique({ where: { id: userId } });

  if (user?.role === role) {
    throw new Error(`User is already a ${role}`);
  }

  await db.roleRequest.create({
    data: {
      userId,
      role,
      status: "PENDING",
    },
  });
}

export async function getRoleRequests() {
  return await db.roleRequest.findMany({ where: { status: "PENDING" } });
}

export async function handleRoleRequest(
  requestId: number,
  status: RoleRequestStatus
) {
  const roleRequest = await db.roleRequest.findUnique({
    where: { id: requestId },
  });

  if (!roleRequest || roleRequest.status !== "PENDING") {
    throw new Error("Invalid or already processed request");
  }

  if (status === RoleRequestStatus.ACCEPTED) {
    await db.user.update({
      where: { id: roleRequest.userId },
      data: { role: roleRequest.role },
    });
  }

  await db.roleRequest.update({
    where: { id: requestId },
    data: { status },
  });
}
