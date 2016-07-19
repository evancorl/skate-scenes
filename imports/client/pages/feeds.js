import React from 'react';

import PageMenu from '../components/page-menu';

const FeedsPage = () => {
  const pageMenuLinks = [
    'Following',
    'Popular',
    'Brands',
    'Cities',
    'Regions',
    'Countries',
  ];

  return (
    <div className="col-wide">
      <PageMenu links={pageMenuLinks} baseUrl="/feeds" />
    </div>
  );
};

export default FeedsPage;
