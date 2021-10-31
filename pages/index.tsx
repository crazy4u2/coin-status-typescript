import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { HOST } from '../config';

import type { GetServerSideProps, NextPage } from 'next';
// const columns: object[] = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text: string) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//     render: (tags: string[]) => (
//       <>
//         {tags.map((tag: any) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (text: string, record: any) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const data: object[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const Home: NextPage = ({ list }: any) => {
  // 추후에는 redux 로 관리
  const [tableHeader, setTableHeader] = useState<object[]>([
    {
      title: '코인',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: '시세',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '1시간',
      dataIndex: 'price1hr',
      key: 'price1hr',
    },
    {
      title: '24시간',
      dataIndex: 'price24hr',
      key: 'price24hr',
    },
    {
      title: '7일',
      dataIndex: 'price7day',
      key: 'price7day',
    },
    {
      title: '24시간 거래량',
      dataIndex: 'vol24hr',
      key: 'vol24hr',
    },
    {
      title: '시가총액',
      dataIndex: 'volTot',
      key: 'volTot',
    },
  ]);
  const [tableData, setTableData] = useState([]);

  const dataForm = list.map((v: any, i: number) => {
    return {
      key: i,
      coin: `${v.name} - ${v.symbol}`,
      price: `$ ${v.current_price ? v.current_price.toLocaleString() : 0}`,
      price1hr: `$ ${
        v.price_change_percentage_1h_in_currency
          ? v.price_change_percentage_1h_in_currency.toFixed(2)
          : 0
      }`,
      price24hr: `$ ${
        v.price_change_percentage_24h_in_currency
          ? v.price_change_percentage_24h_in_currency.toFixed(2)
          : 0
      }`,
      price7day: `$ ${
        v.price_change_percentage_7d_in_currency
          ? v.price_change_percentage_7d_in_currency.toFixed(2)
          : 0
      }`,
      vol24hr: `$ ${v.total_volume ? v.total_volume.toLocaleString() : 0}`,
      volTot: `$ ${v.market_cap ? v.market_cap.toLocaleString() : 0}`,
    };
  });
  useEffect(() => {
    setTableData(dataForm);
  }, []);

  return (
    <div>
      <Head>
        <title>한강가지 말고 한강뷰에 살자</title>
        <meta
          name="description"
          content="No more Han River, Let's go Han River View!"
        />
        <link
          rel="icon"
          href="https://www.coingecko.com/api/documentations/favicon-32x32.png"
        />
      </Head>

      <main>
        <Table columns={tableHeader} dataSource={tableData} />
      </main>

      <footer></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const list = await axios
    .get(
      `${HOST}/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`,
    )
    .then((res) => res.data);
  return {
    props: {
      list,
    },
  };
};

export default Home;
