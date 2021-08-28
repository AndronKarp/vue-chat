import { userEmailsRef } from "@/firebase";

export default async email => {
  const snapshot = await userEmailsRef.once("value");
  const userEmails = Object.values(snapshot.val() ?? {}).map(el => el.value);
  return !userEmails.includes(email);
};
