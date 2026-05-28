import { RoleId } from '../types';

const palette = [
{
  badge: 'bg-purple-100 text-purple-700 border-purple-200',
  avatar: 'bg-purple-500'
},
{ badge: 'bg-blue-100 text-blue-700 border-blue-200', avatar: 'bg-blue-500' },
{
  badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  avatar: 'bg-emerald-500'
},
{
  badge: 'bg-amber-100 text-amber-700 border-amber-200',
  avatar: 'bg-amber-500'
},
{ badge: 'bg-rose-100 text-rose-700 border-rose-200', avatar: 'bg-rose-500' },
{ badge: 'bg-cyan-100 text-cyan-700 border-cyan-200', avatar: 'bg-cyan-500' },
{
  badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  avatar: 'bg-indigo-500'
},
{
  badge: 'bg-orange-100 text-orange-700 border-orange-200',
  avatar: 'bg-orange-500'
}];


const fixed: Record<string, number> = {
  owner: 0,
  manager: 1,
  cashier: 2
};

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = h * 31 + s.charCodeAt(i) >>> 0;
  }
  return h;
}

export function getRoleColor(roleId: RoleId) {
  const idx = fixed[roleId] ?? hashStr(roleId) % palette.length;
  return palette[idx];
}