import { useGetLessonsQuery } from '../graphql/generated';

import { Lesson } from './Lesson';

export function Sidebar() {
  const { data } = useGetLessonsQuery();

  return (
    <aside className="w-[348px] p-6 border-l border-gray-600 bg-gray-700">
      <span className="block mb-6 pb-6 border-b border-gray-500 font-bold text-2xl">
        Cronograma das aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          )
        })}
      </div>
    </aside>
  );
}
