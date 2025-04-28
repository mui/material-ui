'use client';
import * as React from 'react';
import BasicPagination from '../../../../../../docs/data/material/components/pagination/BasicPagination';
import CustomIcons from '../../../../../../docs/data/material/components/pagination/CustomIcons';
import PaginationButtons from '../../../../../../docs/data/material/components/pagination/PaginationButtons';
import PaginationControlled from '../../../../../../docs/data/material/components/pagination/PaginationControlled';
import PaginationLink from '../../../../../../docs/data/material/components/pagination/PaginationLink';
import PaginationOutlined from '../../../../../../docs/data/material/components/pagination/PaginationOutlined';
import PaginationRanges from '../../../../../../docs/data/material/components/pagination/PaginationRanges';
import PaginationRounded from '../../../../../../docs/data/material/components/pagination/PaginationRounded';
import PaginationSize from '../../../../../../docs/data/material/components/pagination/PaginationSize';
import TablePaginationDemo from '../../../../../../docs/data/material/components/pagination/TablePaginationDemo';
import UsePagination from '../../../../../../docs/data/material/components/pagination/UsePagination';

export default function Pagination() {
  return (
    <React.Fragment>
      <section>
        <h2> Basic Pagination</h2>
        <div className="demo-container">
          <BasicPagination />
        </div>
      </section>
      <section>
        <h2> Custom Icons</h2>
        <div className="demo-container">
          <CustomIcons />
        </div>
      </section>
      <section>
        <h2> Pagination Buttons</h2>
        <div className="demo-container">
          <PaginationButtons />
        </div>
      </section>
      <section>
        <h2> Pagination Controlled</h2>
        <div className="demo-container">
          <PaginationControlled />
        </div>
      </section>
      <section>
        <h2> Pagination Link</h2>
        <div className="demo-container">
          <PaginationLink />
        </div>
      </section>
      <section>
        <h2> Pagination Outlined</h2>
        <div className="demo-container">
          <PaginationOutlined />
        </div>
      </section>
      <section>
        <h2> Pagination Ranges</h2>
        <div className="demo-container">
          <PaginationRanges />
        </div>
      </section>
      <section>
        <h2> Pagination Rounded</h2>
        <div className="demo-container">
          <PaginationRounded />
        </div>
      </section>
      <section>
        <h2> Pagination Size</h2>
        <div className="demo-container">
          <PaginationSize />
        </div>
      </section>
      <section>
        <h2> Table Pagination Demo</h2>
        <div className="demo-container">
          <TablePaginationDemo />
        </div>
      </section>
      <section>
        <h2> Use Pagination</h2>
        <div className="demo-container">
          <UsePagination />
        </div>
      </section>
    </React.Fragment>
  );
}
