import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateSubscriberMutation } from '../graphql/generated';

import { Logo } from '../components/Logo';

export function Subscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name, 
        email, 
      }
    });

    navigate('/event');
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-blur bg-cover bg-no-repeat">
      <div className="flex items-center justify-between w-full max-w-[1100px] mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>

          <p className="mt-4 text-gray-400 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="mr p-8 border-gray-500 rounded border bg-gray-700">
          <strong className="block mb-6 text-2xl">
            Inscreva-se gratuitamente
          </strong>

          <form action="" className="flex flex-col gap-2 w-full">
            <input
              type="text" 
              onChange={event => setName(event.target.value)}
              placeholder="Seu nome completo" 
              className="h-14 px-5 rounded bg-gray-900" 
            />

            <input
              type="email" 
              onChange={event => setEmail(event.target.value)}
              placeholder="Digite seu e-mail" 
              className="h-14 px-5 rounded bg-gray-900" 
            />

            <button 
              type="submit"
              disabled={loading}
              onClick={handleSubscribe}
              className="mt-4 py-4 rounded bg-green-500 text-sm font-bold uppercase transition-all hover:bg-green-700 disabled:opacity-50"
            >
              garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
    </div>
  );
}
