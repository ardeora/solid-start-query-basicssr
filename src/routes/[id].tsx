import { createQuery } from "@tanstack/solid-query";
import { A, useParams } from "solid-start";
import Counter from "~/components/Counter";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function About() {
  const { id } = useParams();

  const postDetailsQuery = createQuery(() => ({
    queryKey: ["post-details", id],
    queryFn: async ({ queryKey }) => {
      const post_id = queryKey[1];
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post_id}`
      );
      return res.json() as Promise<Post>;
    },
  }));

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        {postDetailsQuery.data?.title}
      </h1>
      <p class="text-2xl">{postDetailsQuery.data?.body}</p>
    </main>
  );
}
