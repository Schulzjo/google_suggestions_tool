import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from "react-router-dom"

import '@testing-library/jest-dom/extend-expect';


test('smoke test - renders App without Error', () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <App/>
        </MemoryRouter>);
});

// test if SearchField is in main layout
test('Check if Searchfield is on default route available', () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <App/>
        </MemoryRouter>);
    // Idetify button by text
    expect(screen.getByText("Suchen")).toBeInTheDocument();
    // identify input field by Labeltext
    expect(screen.getByLabelText("Suchbegriff")).toBeInTheDocument();
});

test('Check if Searchfield is on non existing route available', () => {
    render(
        <MemoryRouter initialEntries={["/donotexist"]}>
            <App/>
        </MemoryRouter>);
    // Idetify button by text
    expect(screen.getByText("Suchen")).toBeInTheDocument();
    // identify input field by Labeltext
    expect(screen.getByLabelText("Suchbegriff")).toBeInTheDocument();
});

const MOCKED_JSON = {
    'message': {
        'wer mountainbike': ['wer hat mountainbike erfunden', 'wer sucht mountainbike', 'wer erfand das mountainbike'],
        'wie mountainbike': ['wie mountainbike tragen', 'wie mountainbike putzen', 'wie mountainbike cannondale', 'mountainbike wie viel bar', 'mountainbike wie viel zoll', 'mountainbike wie viele gänge', 'mountainbike wie oft kette ölen', 'mountainbike wie schalten'],
        'was mountainbike': ['mountainbike was ist das', 'mountainbike was beachten', 'mountainbike was anziehen', 'mountainbike was wird trainiert', 'mountainbike was ist ein fully', 'was bedeutet mountainbike', 'erlebt was mountainbike', 'was für mountainbikes gibt es'],
        'wo mountainbike': ['wo mountainbike fahren', 'wo mountainbike kaufen', 'wo mountainbiken im winter', 'mountainbike wo darf ich fahren', 'wo dürfen mountainbikes fahren', 'wo ist mountainbiken erlaubt', 'wo e mountainbike kaufen', 'wo darf man mountainbike fahren'],
        'wann mountainbike': ['wann mountainbike reifen wechseln', 'wann mountainbike kaufen', 'mountainbike wann schalten', 'ab wann mountainbike für kinder', 'wann wurde mountainbike erfunden', 'wann ist ein mountainbike verkehrstauglich', 'wann findet das mountainbike testival 2023 statt', 'wann bremsbeläge wechseln mountainbike'],
        'warum mountainbike': ['warum mountainbike ohne schutzblech', 'warum sind mountainbike sattel so hart', 'warum haben mountainbikes nur 12 gänge', 'warum haben mountainbikes keinen ständer', 'warum sind mountainbikes so teuer', 'warum haben mountainbikes kein licht', 'flow warum mountainbiken glücklich macht', 'warum haben mountainbikes so breite lenker']
    }
}

const MOCKED_RESPONSE = new Response(JSON.stringify(MOCKED_JSON), {
    status: 200,
    headers: { 'Content-type': 'application/json' },
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('Check if ResultPage is on route /result/:param available with mocked_response', async () => {

    jest.spyOn(global, 'fetch').mockResolvedValue(MOCKED_RESPONSE);

    /* eslint-disable testing-library/no-unnecessary-act */
    await act(async () => {
    render(
        <MemoryRouter initialEntries={["/result/mountainbike"]}>
            <App/>
        </MemoryRouter>);
    })

    // Searchfield should be still rendered in header
    expect(screen.getByText("Suchen")).toBeInTheDocument();
    expect(screen.getByLabelText("Suchbegriff")).toBeInTheDocument();
    // identify result by text
    expect(screen.getByText("wer mountainbike")).toBeInTheDocument();
    expect(screen.getByText("wie mountainbike")).toBeInTheDocument();
    expect(screen.getByText("was mountainbike")).toBeInTheDocument();
    expect(screen.getByText("wo mountainbike")).toBeInTheDocument();
    expect(screen.getByText("wann mountainbike")).toBeInTheDocument();
    expect(screen.getByText("warum mountainbike")).toBeInTheDocument();
})

test('Check Alert dialog is shown on error', async () => {

    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    /* eslint-disable testing-library/no-unnecessary-act */
    await act(async () => {
    render(
        <MemoryRouter initialEntries={["/result/mountainbike"]}>
            <App/>
        </MemoryRouter>);
    })

    // Searchfield should be still rendered in header
    expect(screen.getByText("Suchen")).toBeInTheDocument();
    expect(screen.getByLabelText("Suchbegriff")).toBeInTheDocument();
    // identify result by text
    expect(screen.getByText("Network error")).toBeInTheDocument();
})