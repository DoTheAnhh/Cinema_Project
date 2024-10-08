import React, { useEffect, useState } from 'react'
import { Actorr } from '../Types';
import { Button, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';

interface ActorProps {
  actor: Actorr | null;
  onClose: () => void;
  onSuccess: () => void;
}

const Actor: React.FC<ActorProps> = ({ actor, onClose, onSuccess }) => {
  const [actorName, setActorName] = useState<string>('')

  useEffect(() => {
    if (actor) {
      setActorName(actor.actorName);
    } else {
      setActorName('');
    }
  }, [actor]);

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  };

  const handleInsertOrUpdateActor = async () => {
    if (!actorName.trim()) {
      message.error('Actor name is required');
      return false;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = decodeJwt(token);
      if (!decodedToken) {
        console.error('Invalid token');
        return;
      }

      const userRole = decodedToken.role;

      if (userRole !== 'ADMIN') {
        console.error('User does not have the required ADMIN role');
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const data = { actorName };
      if (actor && actor.id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.ACTOR + API.ACTOR.EDIT_ACTOR + `/${actor.id}`, data, config);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.ACTOR + API.ACTOR.INSERT_ACTOR, data, config);
      }
      onSuccess();
      onClose();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };

  return (
    <>
      <Form>
        <Form.Item label="Actor name" required>
          <Input value={actorName} onChange={(e) => setActorName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Are you sure to submit this movie type?"
            onConfirm={handleInsertOrUpdateActor}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </>
  )
}

export default Actor