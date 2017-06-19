/** jsx */
import React from 'react';
import { Button } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentList from '../../components/documentComponents/DocumentList';

const UserDocuments = ({ userDocuments }) => {
  const documents = userDocuments.data;
  const publicCount = (documents.filter(document => document.access === 'public')).length;
  const privateCount = (documents.filter(document => document.access === 'private')).length;
  const roleCount = (documents.filter(document => document.access === 'role')).length;

  return (
    <div>
      <div>
        <span>
          <Button
            raised
            className="button"
            colored
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
              # Public
              <span /> {publicCount}
          </Button>
          <span />
          <span />
          <Button
            raised
            className="button"
            colored
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
              # Private
              <span /> {privateCount}
          </Button>
          <span />
          <span />
          <Button
            raised
            className="button"
            colored
            style={{
              width: '150px',
              marginRight: '10px' }}
          >
              # Role
              <span /> {roleCount}
          </Button>
        </span>
      </div>

      <div>
        <div>
          <h4>My Documents</h4>
        </div>
        { documents.length > 0 ?
          <DocumentList
            documents={documents}
          />
        : <p className="no-document-p">You have no documents yet</p>
        }
      </div>
    </div>
  );
};

UserDocuments.propTypes = {
  userDocuments: PropTypes.object.isRequired,
};

export default UserDocuments;