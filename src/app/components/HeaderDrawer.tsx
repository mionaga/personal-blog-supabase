'use client'

import React, { useState } from 'react';
import { Home, EditNote, Summarize, Dns, Logout } from '@mui/icons-material';
import { Button, Drawer as MuiDrawer, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

const menu = [
  { title: 'ホーム', href: '/', icon: Home },
  { title: '記事を書く', href: '/admin/articles/new', icon: EditNote },
  { title: 'ブログ記事一覧（編集用）', href: '/admin/articles', icon: Summarize },
  { title: 'カテゴリー一覧(編集用）', href: '/admin/categories', icon: Dns },
];

type DrawerProps = {
  isAdminRoute: boolean;
  handleLogout: () => void;
}

const HeaderDrawer = ({isAdminRoute, handleLogout}: DrawerProps) => {
    const [show, setShow] = useState<boolean>(false);
    const handleDraw = () => setShow(!show);

  return (
    <>
    <Button onClick={handleDraw} variant="text" className={`w-full p-2 min-w-min ${isAdminRoute? 'bg-gray-600' : 'bg-gray-100'}`}>
      <div className='flex flex-col justify-around w-8 h-6 sm:w-10'>
        <div className={`w-full h-1 ${isAdminRoute? 'bg-slate-50' : 'bg-gray-600'}`}></div>
        <div className={`w-full h-1 ${isAdminRoute? 'bg-slate-50' : 'bg-gray-600'}`}></div>
        <div className={`w-full h-1 ${isAdminRoute? 'bg-slate-50' : 'bg-gray-600'}`}></div>
      </div>
    </Button>
    <MuiDrawer anchor='right' open={show} onClose={handleDraw}>
      <Box className='h-fit' onClick={handleDraw}>
        <List>
          {menu.map((obj, index) => {
            const Icon = obj.icon;
            return (
              <ListItem key={index}>
                <ListItemButton component='a' href={obj.href}>
                  <ListItemIcon><Icon /></ListItemIcon>
                  <ListItemText primary={obj.title} />
                </ListItemButton>
              </ListItem>
            )
          })}
          <ListItem>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary='ログアウト' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </MuiDrawer>
    </>
  )
}

export default HeaderDrawer;
