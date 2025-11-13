<script lang="ts">
  type FAQ = {
    title: string;
    questions: { label: string; content: string }[];
  };

  const faqs: FAQ[] = [
    {
      title: "Services",
      questions: [
        {
          label: "What services do you offer?",
          content:
            "I offer a range of services including web design, web development, branding, and photography. I can also help with SEO and social media marketing.",
        },
        {
          label: "Can you teach me how to make a website?",
          content:
            "I don't offer courses at the moment, but I can recommend resources and advice to help you get the most out of your learning",
        },
      ],
    },
    {
      title: "Pricing",
      questions: [
        {
          label: "How much does a project cost?",
          content:
            "The cost of a project depends on many factors, such as the size of the project, the features, the development time, etc. The initial amount of my web services starts at 2000€, with an average between 3000€ and 10000€. For any other design or consulting service, I usually charge 450€ per day.",
        },
        {
          label: "How does payment work for a project?",
          content:
            "I ask for a 40% deposit before starting a project, and the remaining 60% after successful delivery. I accept payments by bank transfer, PayPal, etc...",
        },
        {
          label: "How long does a project take?",
          content:
            "It's difficult to give an exact estimate, as each project is different, but the majority of my past work has taken between 2 weeks and 2 months.",
        },
        {
          label: "Do you offer discounts?",
          content:
            "I offer a 15% discount for students and non-profit organizations.",
        },
      ],
    },
    {
      title: "Personal",
      questions: [
        {
          label: "What do you enjoy most about this work?",
          content:
            "I love learning new things and being able to create just about anything from scratch, creating beautiful things that people will use and appreciate.",
        },
        {
          label: "Hobbies outside of work?",
          content:
            "I love what I do, so I usually spend a lot of time working on personal projects, photography, etc. I'm also a big sports fan. I often go to the gym and I recently started climbing!",
        },
      ],
    },
  ];

  let activeTab = $state(0);
</script>

<div
  class="flex flex-col items-center justify-center space-y-8 w-full sm:px-20 md:px-30"
>
  <div class="flex flex-col items-center justify-center gap-2">
    <h3 class="font-newsreader italic text-white-shadow text-4xl">FAQ</h3>
    <p class="text-center text-sm font-medium text-muted">
      Things I get asked a lot
    </p>
  </div>

  <div class="flex w-full gap-4">
    {#each faqs as faq, index (faq.title)}
      <button
        class="relative inline-flex w-full items-center justify-center focus:outline-none transition-colors duration-200 ease-out border-white/10 border-2 px-3 py-2 text-sm font-semibold rounded-full hover:bg-neutral-900/80 data-[state=active]:text-highlighted data-[state=inactive]:text-muted data-[state=active]:bg-neutral-800/80"
        data-state={activeTab === index ? "active" : "inactive"}
        onclick={() => (activeTab = index)}
      >
        {faq.title}
      </button>
    {/each}
  </div>

  {#if faqs[activeTab]}
    {@const activeFaq = faqs[activeTab]}
    <div
      class="w-full flex flex-col gap-2 *:rounded-2xl *:py-2 *:px-3 *:bg-neutral-900/90"
    >
      {#each activeFaq.questions as faq (faq)}
        <details
          class="mb-2 group px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/7.5"
        >
          <summary
            class="cursor-pointer flex items-center justify-between py-2 font-medium"
          >
            <span>
              {faq.label}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-plus-icon lucide-plus rotate-0 transition-transform duration-300 group-open:rotate-135 size-5"
              ><path d="M5 12h14" /><path d="M12 5v14" /></svg
            >
          </summary>

          <p class="mt-2 px-4 pb-4">
            {faq.content}
          </p>
        </details>
      {/each}
    </div>
  {/if}
</div>
