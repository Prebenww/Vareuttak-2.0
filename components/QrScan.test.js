import React from "react";
import renderer from 'react-test-renderer';
import QrScan from "./QrScan";



test('renders correctly', () => {
    const tree = renderer.create(<QrScan/>).toJSON();
    expect(tree).toMatchSnapshot();
});