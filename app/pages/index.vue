<template>
  <main>
    <UPageHero
      title="STFC Early Careers Code Club"
      description="A weekly meeting for early career staff at STFC to learn about software development and share knowledge."
      :links="[
        {
          label: 'Browse Talks',
          to: '/talks',
          icon: 'i-lucide-speech'
        },
        {
          label: 'Check who\'s involved',
          to: '/people',
          icon: 'i-lucide-users',
          variant: 'soft'
        },
        {
          label: 'Request a Talk',
          to: '/talk-requests',
          icon: 'i-lucide-plus',
          variant: 'outline'
        },
        {
          label: 'Join the Community',
          to: 'https://teams.microsoft.com/l/team/19%3AXpRLCeplTbX1pkEymOb1E4EUr1s6dSPyaBVYVAYbEO01%40thread.tacv2/conversations?groupId=3e4e04d5-996c-40fc-9269-ce7b30f2b13c&tenantId=3f66361c-a87e-4158-8f61-99e82db3cac8',
          icon: 'i-lucide-door-open',
          variant: 'outline'
        }
      ]"
    >
      <template #headline>
        <UIcon name="i-lucide-cat" class="size-20" />
      </template>
    </UPageHero>

    <ul class="grid grid-cols-3 gap-4">
      <UPageFeature
        title="Talks"
        description="Attend talks which cover a wide range of topics related to software development and best practices."
        icon="i-lucide-speech"
      />
      <UPageFeature
        title="Challenges"
        description="Participate in our coding challenges, which are designed to help you practice and improve."
        icon="i-lucide-clipboard-list"
      />
      <UPageFeature
        title="Community"
        description="Share your ideas for future talks or challenges, or volunteer to give a talk or host a challenge yourself."
        icon="i-lucide-hand-heart"
      />
    </ul>
  </main>
</template>