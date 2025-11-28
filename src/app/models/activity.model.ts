export interface Activity 
{
  id: number,
  title: string,
  description?: string,
  schedule?: string,
  status: 'prevue' | 'faite'
}