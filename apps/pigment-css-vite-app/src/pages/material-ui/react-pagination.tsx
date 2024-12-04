import * as React from 'react';
import MaterialUILayout from '../../Layout';
import BasicPagination from '../../../../../docs/data/material/components/pagination/BasicPagination.tsx';
import CustomIcons from '../../../../../docs/data/material/components/pagination/CustomIcons.tsx';
import PaginationButtons from '../../../../../docs/data/material/components/pagination/PaginationButtons.tsx';
import PaginationControlled from '../../../../../docs/data/material/components/pagination/PaginationControlled.tsx';
import PaginationLink from '../../../../../docs/data/material/components/pagination/PaginationLink.tsx';
import PaginationOutlined from '../../../../../docs/data/material/components/pagination/PaginationOutlined.tsx';
import PaginationRanges from '../../../../../docs/data/material/components/pagination/PaginationRanges.tsx';
import PaginationRounded from '../../../../../docs/data/material/components/pagination/PaginationRounded.tsx';
import PaginationSize from '../../../../../docs/data/material/components/pagination/PaginationSize.tsx';
import TablePaginationDemo from '../../../../../docs/data/material/components/pagination/TablePaginationDemo.tsx';
import UsePagination from '../../../../../docs/data/material/components/pagination/UsePagination.tsx';

export default function Pagination() {
  return (
    <MaterialUILayout>
      <h1>Pagination</h1>
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
    </MaterialUILayout>
  );
}
