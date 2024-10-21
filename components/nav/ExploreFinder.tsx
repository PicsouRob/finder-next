import React from 'react';

import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem,
    NavigationMenuList, NavigationMenuTrigger
} from '../ui/navigation-menu';
import ExploreItem from './ExploreItem';

const ExploreFinder = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className='text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2'
                    >
                        Explorer
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="z-30">
                        <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                            <ExploreItem href="/search?query=freelancers" title="Freelancers">
                                Rechercher des freelances qualifiés pour votre projet.
                            </ExploreItem>

                            <ExploreItem href="/search?query=employers" title="Ambaucheurs">
                                Rechercher des ambaucheurs pour des opportunités de travail.
                            </ExploreItem>

                            <ExploreItem href="/search?query=projects" title="Projects">
                                Voir les projects des freelancers.
                            </ExploreItem>

                            <ExploreItem href="/search?query=pubs" title="Publicités">
                                Rechercher des publicités pour des evenements.
                            </ExploreItem>

                            {/* <ExploreItem href="/docs/installation" title="Installation">
                                How to install dependencies and structure your app.
                            </ExploreItem> */}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default ExploreFinder;