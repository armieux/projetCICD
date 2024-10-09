import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import groupService from '../services/groupService';

function InvitationPage() {
    const { inviteId } = useParams(); // Grab inviteId from URL
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    const [responseStatus, setResponseStatus] = useState(null); // Track the response status
    const [error, setError] = useState(null); // Track errors
    const navigate = useNavigate(); // For navigation (redirection)

    useEffect(() => {
        const sendInvitationResponse = async () => {
            try {
                if (userId) {
                    // Await the API call with inviteId and userId
                    const response = await groupService.respondToInvitation(inviteId, userId);

                    // Check status of the response
                    if (response.status === 'success') {
                        setResponseStatus('success');
                    } else {
                        setResponseStatus('error');
                    }
                } else {
                    // If no userId, redirect to login
                    alert('Please log in to respond to the invitation.');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error responding to invitation:', error);
                setError('An error occurred while responding to the invitation.');
            }
        };

        sendInvitationResponse();
    }, [inviteId, userId, navigate]);

    return (
        <div>
            <h1>Invitation Response Page</h1>
            {responseStatus === 'success' ? (
                <p>Invitation accepted! You are now part of the group.</p>
            ) : responseStatus === 'error' ? (
                <p>There was an issue accepting the invitation. Please try again.</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Processing your invitation...</p>
            )}
        </div>
    );
}

export default InvitationPage;