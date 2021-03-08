import * as React from 'react';
import { TextInput as PaperInput } from 'react-native-paper';

const MyComponent = (props) => {

    return (
        <PaperInput
            {...props}
            value={text}
        />
    );
};

export default MyComponent;