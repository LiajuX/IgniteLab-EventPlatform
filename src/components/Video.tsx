import { DefaultUi, Player, Youtube } from '@vime/react';
import { 
  CaretRight, 
  DiscordLogo, 
  FileArrowDown, 
  Image, 
  Lightning, 
} from 'phosphor-react';

import { useGetLessonBySlugQuery } from '../graphql/generated';

import { RocketseatLogo } from './RocketseatLogo';

import '@vime/core/themes/default.css';

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug,
    }
  });

  if (!data || !data.lesson ) {
    return (
      <div className="flex-1 align-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto p-8">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
          
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
                <img
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt="" 
                />
              
                <div className="leading-relaxed">
                  <strong className="block text-2xl font-bold">
                    {data.lesson.teacher.name}
                  </strong>
                  
                  <span className="block text-sm text-gray-200">
                    {data.lesson.teacher.bio}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <a href="" className="flex items-center justify-center gap-2 p-4 rounded bg-green-500 text-sm font-bold uppercase transition-all hover:bg-green-700">
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>

            <a href="" className="flex items-center justify-center gap-2 p-4 rounded border border-blue-500 text-blue-500 text-sm font-bold uppercase transition-all hover:bg-blue-500 hover:text-gray-900">
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 my-20">
          <a 
            href="" 
            className="flex items-stretch gap-6 rounded bg-gray-700 overflow-hidden transition-all hover:bg-gray-600"
          >
            <div className="flex items-center h-full p-6 bg-green-700">
              <FileArrowDown size={40} />
            </div>
            
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>

              <p className="mt-2 text-sm text-gray-200">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>
          
            <div className="flex items-center h-full p-6 text-blue-500">
              <CaretRight size={24} />
            </div>
          </a>

          <a 
            href="" 
            className="flex items-stretch gap-6 rounded bg-gray-700 overflow-hidden transition-all hover:bg-gray-600"
          >
            <div className="flex items-center h-full p-6 bg-green-700">
              <Image size={40} />
            </div>
            
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>

              <p className="mt-2 text-sm text-gray-200">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>
          
            <div className="flex items-center h-full p-6 text-blue-500">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>

      <footer className="flex items-start justify-between mx-8 py-6 border-t border-gray-600">
        <div className="flex items-center gap-6">
          <RocketseatLogo />
          
          <span className="block text-sm text-gray-300">
            Rocketseat - Todos os direitos reservados
          </span>
        </div>

        <span className="block text-sm text-gray-300">
          Políticas de privacidade
        </span>
      </footer>
    </div>
  );
}
