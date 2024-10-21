import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
    BriefcaseIcon, ChevronDownIcon, ClipboardDocumentListIcon, RectangleGroupIcon, UsersIcon, CheckIcon
} from '@heroicons/react/24/outline';

type SearchOptionData = {
    title: string;
    text: string;
    icon: React.ReactNode;
    value: string
}

const searchOption: SearchOptionData[] = [
    { 
        title: 'Freelancer',
        icon: <UsersIcon className='h-6 w-6 font-medium' />,
        text: 'Embaucher des professionels',
        value: ""
    },
    { 
        title: 'Travail',
        icon: <BriefcaseIcon className='h-6 w-6 font-medium' />,
        text: "Voir les offres d'emploi publiées par les clients",
        value: ""
    },
    { 
        title: 'Projet',
        icon: <RectangleGroupIcon className='h-6 w-6 font-medium' />,
        text: 'Voir les projets des freelances',
        value: ""
    },
    { 
        title: 'Publicités',
        icon: <ClipboardDocumentListIcon className='h-6 w-6 font-medium' />,
        text: 'Voir les pubs des agences',
        value: ""
    },
];

const SelectSearchOption: React.FC = () => {
  const [selected, setSelected] = useState(searchOption[0])

    return (
        <div className="w-44">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.title}</span>

                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                                className="h-4 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute right-0 mt-1 max-h-60 min-w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {searchOption.map((option, optionIdx) => (
                                <Listbox.Option
                                    key={optionIdx}
                                    className={({ active }) =>
                                        `relative cursor-default flex items-center gap-x-3 select-none py-2 px-4 ${active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            {selected ? (
                                                <span className="flex items-center text-green-900">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                            {!selected && (
                                                <>
                                                    {option.icon}
                                                </>
                                            )}

                                            <div
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                <h2 className="font-bold">{option.title}</h2>
                                                <p className="text-sx">{ option.text }</p>
                                            </div>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export default SelectSearchOption;