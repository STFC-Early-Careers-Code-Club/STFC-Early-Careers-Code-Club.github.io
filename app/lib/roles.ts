export enum Role {
  CommitteeMember = 'Committee Member',
  WebsiteMaintainer = 'Website Maintainer',
  Speaker = 'Speaker',
  TopSpeaker = 'Top Speaker',
  Chair = 'Chair'
}

export function isRole(value: string): value is Role {
  return Object.values(Role).includes(value as Role)
}

export const ROLE_ICONS: Record<Role, string> = {
  [Role.CommitteeMember]: 'i-lucide-shield-user',
  [Role.WebsiteMaintainer]: 'i-lucide-code-xml',
  [Role.Speaker]: 'i-lucide-speech',
  [Role.TopSpeaker]: 'i-lucide-medal',
  [Role.Chair]: 'i-lucide-crown'
}
