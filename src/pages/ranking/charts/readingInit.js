// 图书借阅量统计图
export function readingInit(data) {
  const chart = new G2.Chart({
    container: 'chart1',
    autoFit: true,
    height: 250,
  });
  chart.data(data);
  chart.scale('borrowTotal', {
    alias: '次数'
  });
  chart.axis('name', {
    tickLine: null,
  });
  chart.tooltip({
    shared: true,
    showMarkers: false,
    title:'author'
  });
  chart.interaction('active-region');
  chart.axis('borrowTotal',
    {
      label: {
        formatter: text => {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      },
      title: {
        offset: 80,
        style: {
          fill: '#aaaaaa'
        },
      }
    }
  );
  chart
    .interval()
    .adjust('stack')
    .position('name*borrowTotal')
    .color('name', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3']);
  chart.render();
  return chart
}

