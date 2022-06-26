import { Link, useParams } from 'react-router-dom';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const { slug: currentSlug } = useParams<{ slug: string }>();

  const isLessonActive =  currentSlug === slug;

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(availableAt, "EEEE ' • ' d ' de ' MMMM  ' • ' k'h'mm", {
    locale: ptBR,
  });

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted} 
      </span>

      <div 
        className={classNames('relative mt-2 p-4 rounded border border-gray-500 transition-all group-hover:border-green-500', {
          'bg-green-500': isLessonActive,
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('flex items-center gap-2 text-sm font-medium', {
              'text-white': isLessonActive,
              'text-blue-500': !isLessonActive,
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-orange-500 text-sm font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span 
            className={classNames('py-[0.125rem] px-2 rounded border border-green-300 text-xs text-white font-bold', {
              'border-white': isLessonActive,
            })}
          >
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames('block mt-5', {
          'text-white': isLessonActive,
          'text-gray-200': !isLessonActive,
        })}>
          {title}
        </strong>
      </div>
    </Link>
  );
}