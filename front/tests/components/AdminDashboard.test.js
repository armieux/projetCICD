import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from './../../src/components/AdminDashboard';
import { act } from 'react';

describe('AdminDashboard', () => {
    it('renders without crashing', () => {
        act(() => {
            render(<AdminDashboard />);
        });
        expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    // Add more tests for button clicks and state changes
});