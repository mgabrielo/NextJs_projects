export function userIsConversationParticipant(
  participants: Array<any>,
  userId: string
): boolean {
  return !!participants.find((participant) => participant.userId === userId);
}
