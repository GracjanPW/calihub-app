import { auth } from "../auth"

export async function getUser() {
    try {
      const session = await auth();
      return session?.user
    } catch {
      return null
    }
}