import { createQuery } from "@tanstack/solid-query";
import { For } from "solid-js";
import { A } from "solid-start";
import Counter from "~/components/Counter";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const postsQuery = createQuery(() => ({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json() as Promise<Post[]>;
    },
  }));

  return (
    <main class="mx-auto text-gray-700 p-4">
      <h1 class="text-4xl font-medium pb-4">Posts</h1>
      <div class="flex flex-col gap-2 items-baseline">
        <For each={postsQuery.data}>
          {(post) => (
            <A
              class="block text-left underline text-blue-600 hover:text-blue-800 visited:text-purple-700"
              href={`/${post.id}`}
            >
              {post.title}
            </A>
          )}
        </For>
      </div>
    </main>
  );
}
