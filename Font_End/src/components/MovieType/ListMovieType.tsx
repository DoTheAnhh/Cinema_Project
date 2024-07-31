import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { Button, Col, Modal, Row, Table, Tooltip } from 'antd';
import { MovieTypee } from '../Types';
import { EditFilled } from '@ant-design/icons';
import MovieType from './MovieType';

const ListMovieType: React.FC = () => {

  const [movieTypes, setMovieTypes] = useState();
  const [selectedMovieType, setSelectedMovieType] = useState<MovieTypee | null>(null);
  const [isModalOpenMovieType, setIsModalOpenMovieType] = useState(false);

  const fetchMovieType = async () => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.GETALL_MOVIE_TYPE);
      setMovieTypes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const showModalMovieType = (movieType: MovieTypee | null) => {
    setSelectedMovieType(movieType);
    setIsModalOpenMovieType(true);
  };

  const handleCancelMovieType = () => {
    setSelectedMovieType(null);
    setIsModalOpenMovieType(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'movieTypeName',
      key: 'movieTypeName',
      align: 'center' as const,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as const,
      render: (record: MovieTypee) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title="Edit">
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => showModalMovieType(record)}
              icon={<EditFilled />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];


  useEffect(() => {
    fetchMovieType();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Button
            type="primary"
            style={{ marginBottom: 10, marginLeft: 340 }}
            onClick={() => showModalMovieType(null)}
          >
            New Movie Type
          </Button>
          <Modal
            title="Movie Type"
            open={isModalOpenMovieType}
            onCancel={handleCancelMovieType}
            footer={null}
          >
            <MovieType movieType={selectedMovieType} onClose={handleCancelMovieType} onSuccess={fetchMovieType}
            />
          </Modal>
        </Col>
      </Row>
      <Table
        className="table table-striped mt-3"
        columns={columns}
        dataSource={movieTypes}
        rowKey="id"
        pagination={false}
        bordered
      />
    </>
  );
};

export default ListMovieType;
