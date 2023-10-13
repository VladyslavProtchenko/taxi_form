import React, { FocusEventHandler, useEffect } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {  useJsApiLoader } from '@react-google-maps/api';

interface ILocation {
    placeholder: string;
    onChange: (value: string) => void;
    defaultLocation?: string;
    style?: string;
    onBlur?: FocusEventHandler<HTMLInputElement>
}

const GoogleAddressInput = ({ onBlur, placeholder, onChange, defaultLocation, style }:ILocation) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAVbNNSBv8rX8ftQkneIxpdVcGy-bdhUvw' || ''
    })

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({ callbackName: "YOUR_CALLBACK_NAME", initOnMount: false, debounce: 300 });

    useEffect(() => {
        if(defaultLocation) {
            setValue(defaultLocation,false)
        } else setValue('')
    }, [defaultLocation]);

    useEffect(() => {
        if (isLoaded) init();
    }, [isLoaded, init]);

    const ref = useOnclickOutside(() => clearSuggestions());
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) };

    const handleSelect = ({ description }:{description: string}) => () => {
        setValue(description, false);
        clearSuggestions();
        getGeocode({ address: description }).then((results) => onChange(results[0].formatted_address));
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

        return (
            <div key={place_id} className={oneItem} onClick={handleSelect(suggestion)}>
                <strong>{main_text}</strong> <small>{secondary_text}</small>
            </div>
        );
    });

    return (
        <div className={container+' '+ style} ref={ref}>
            <input
                onBlur={onBlur}
                className={input}
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder={placeholder}
            />
            {status === "OK" && <ul className={submenu}>{renderSuggestions()}</ul>}

        </div>
    );
};

export default GoogleAddressInput;

const input = ' text-sm w-full cursor-pointer relative px-2 py-1 focus:border-blue-800 w-[200px] outline-none'
const submenu = 'absolute top-full bg-white z-10'
const oneItem ='cursor-pointer hover:bg-gray-50 px-4 py-1'

const container = 'relative w-[200px]'