import React from 'react';
import { Control, useController } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CompletedSignupSchemaType } from '@/types/form';

type SelectCityProps = {
    control: Control<CompletedSignupSchemaType>
};

const SelectCity: React.FC<SelectCityProps> = ({ control }) => {
    const {
        field: { value, onChange },
        fieldState: { error }
    } = useController({ name: 'location', control });

    return (
        <FormField
            control={control}
            name="location"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Adresse</FormLabel>

                    <FormControl>
                        <Select {...field} onValueChange={onChange} value={value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une adresse" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Port-au-Prince">Port-au-Prince</SelectItem>
                                <SelectItem value="Carrefour">Carrefour</SelectItem>
                                <SelectItem value="Petion-ville">Pétion-Ville</SelectItem>
                                <SelectItem value="Cite-soleil">Cité Soleil</SelectItem>
                                <SelectItem value="Delmas">Delmas</SelectItem>
                                <SelectItem value="Kenscoff">Kenscoff</SelectItem>
                                <SelectItem value="Croix-des-Bouquets">Croix-des-Bouquets</SelectItem>
                                <SelectItem value="Gressier">Gressier</SelectItem>
                                <SelectItem value="Leogane">Léogâne</SelectItem>
                                <SelectItem value="Cap-Haitien">Cap-Haïtien</SelectItem>
                                <SelectItem value="Limbe">Limbé</SelectItem>
                                <SelectItem value="Milot">Milot</SelectItem>
                                <SelectItem value="Grande-Riviere-du-Nord">Grande-Rivière-du-Nord</SelectItem>
                                <SelectItem value="Plaine-du-Nord">Plaine-du-Nord</SelectItem>
                                <SelectItem value="Les Cayes">Les Cayes</SelectItem>
                                <SelectItem value="Port-Salut">Port-Salut</SelectItem>
                                <SelectItem value="Camp-Perrin">Camp-Perrin</SelectItem>
                                <SelectItem value="Chantal">Chantal</SelectItem>
                                <SelectItem value="Aquin">Aquin</SelectItem>
                                <SelectItem value="Port-de-Paix">Port-de-Paix</SelectItem>
                                <SelectItem value="Jean-Rabel">Jean-Rabel</SelectItem>
                                <SelectItem value="Saint-Louis-du-Nord">Saint-Louis-du-Nord</SelectItem>
                                <SelectItem value="Gonaives">Gonaïves</SelectItem>
                                <SelectItem value="Saint-Marc">Saint-Marc</SelectItem>
                                <SelectItem value="Gros-Morne">Gros-Morne</SelectItem>
                                <SelectItem value="Petite-Riviere-de-l'Artibonite">Petite-Rivière-de-l&apos;Artibonite</SelectItem>
                                <SelectItem value="Jacmel">Jacmel</SelectItem>
                                <SelectItem value="Marigot">Marigot</SelectItem>
                                <SelectItem value="Cayes-Jacmel">Cayes-Jacmel</SelectItem>
                                <SelectItem value="Fort-Liberte">Fort-Liberté</SelectItem>
                                <SelectItem value="Ouanaminthe">Ouanaminthe</SelectItem>
                                <SelectItem value="Trou-du-Nord">Trou-du-Nord</SelectItem>
                                <SelectItem value="Hinche">Hinche</SelectItem>
                                <SelectItem value="Mirebalais">Mirebalais</SelectItem>
                                <SelectItem value="Lascahobas">Lascahobas</SelectItem>
                                <SelectItem value="Jeremie">Jérémie</SelectItem>
                                <SelectItem value="Anse-d'Hainault">Anse d&apos;Hainault</SelectItem>
                                <SelectItem value="Dame-Marie">Dame-Marie</SelectItem>
                                <SelectItem value="Miragoane">Miragoâne</SelectItem>
                                <SelectItem value="Anse-a-Veau">Anse-à-Veau</SelectItem>
                                <SelectItem value="Petit-Trou-de-Nippes">Petit-Trou-de-Nippes</SelectItem>

                                <SelectItem value="Mariani">Mariani</SelectItem>
                                <SelectItem value="Beausejour">Beauséjour</SelectItem>
                                <SelectItem value="Thomassin">Thomassin</SelectItem>
                                <SelectItem value="Furcy">Furcy</SelectItem>
                                <SelectItem value="Bas-Limbe">Bas-Limbé</SelectItem>
                                <SelectItem value="Camp-Louise">Camp-Louise</SelectItem>
                                <SelectItem value="Petit-Bourg-du-Borgne">Petit-Bourg-du-Borgne</SelectItem>
                                <SelectItem value="Basse-Plaine">Basse-Plaine</SelectItem>
                                <SelectItem value="Zanglais">Zanglais</SelectItem>
                                <SelectItem value="Trouin">Trouin</SelectItem>
                                <SelectItem value="Roche-a-Bateau">Roche-à-Bateau</SelectItem>
                                <SelectItem value="Cavaillon">Cavaillon</SelectItem>
                                <SelectItem value="Baie-de-Henne">Baie-de-Henne</SelectItem>
                                <SelectItem value="Lacoma">Lacoma</SelectItem>
                                <SelectItem value="Chansolme">Chansolme</SelectItem>
                                <SelectItem value="Mole-Saint-Nicolas">Môle-Saint-Nicolas</SelectItem>
                                <SelectItem value="La-Chapelle">La Chapelle</SelectItem>
                                <SelectItem value="Desdunes">Desdunes</SelectItem>
                                <SelectItem value="Montrouis">Montrouis</SelectItem>
                                <SelectItem value="Marchand-Dessalines">Marchand-Dessalines</SelectItem>
                                <SelectItem value="Belle-Anse">Belle-Anse</SelectItem>
                                <SelectItem value="Lavoute">Lavoute</SelectItem>
                                <SelectItem value="Bas-Cap-Rouge">Bas-Cap-Rouge</SelectItem>
                                <SelectItem value="Fond-Melon">Fond-Melon</SelectItem>
                                <SelectItem value="Ferrier">Ferrier</SelectItem>
                                <SelectItem value="Perches">Perches</SelectItem>
                                <SelectItem value="Grand-Bassin">Grand-Bassin</SelectItem>
                                <SelectItem value="Caracol">Caracol</SelectItem>
                                <SelectItem value="Savanette">Savanette</SelectItem>
                                <SelectItem value="Belladere">Belladère</SelectItem>
                                <SelectItem value="Boucan-Carre">Boucan-Carré</SelectItem>
                                <SelectItem value="Thomassique">Thomassique</SelectItem>
                                <SelectItem value="Marfranc">Marfranc</SelectItem>
                                <SelectItem value="Abricots">Abricots</SelectItem>
                                <SelectItem value="Anse-du-Clerc">Anse-du-Clerc</SelectItem>
                                <SelectItem value="Pestel">Pestel</SelectItem>
                                <SelectItem value="Baraderes">Baradères</SelectItem>
                                <SelectItem value="Grand-Boucan">Grand-Boucan</SelectItem>
                                <SelectItem value="Paillant">Paillant</SelectItem>
                                <SelectItem value="Petite-Riviere-de-Nippes">Petite-Rivière-de-Nippes</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default SelectCity;