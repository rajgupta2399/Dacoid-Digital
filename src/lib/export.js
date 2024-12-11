export function exportToJson(events) {
  const dataStr = JSON.stringify(events, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `calendar-events-${new Date().toISOString().slice(0, 7)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function exportToCsv(events) {
  const headers = ['Title', 'Start', 'End', 'Description', 'Color'];
  const rows = events.map(event => [
    event.title,
    new Date(event.start).toLocaleString(),
    new Date(event.end).toLocaleString(),
    event.description || '',
    event.color
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  const exportFileDefaultName = `calendar-events-${new Date().toISOString().slice(0, 7)}.csv`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}