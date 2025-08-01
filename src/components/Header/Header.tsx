"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Popover,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useState } from "react";
import type { HeaderProps, MenuItem as MenuItemType } from "./Header.types";

type Props = {
  data: HeaderProps;
};

export default function Header({ data }: Props) {
  const { styles } = data;
  const underlineColor = styles?.underlineColor || "#FFD700";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [id: number]: boolean }>(
    {}
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleExpand = (id: number) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item: MenuItemType) => {
    const hasSubmenu = item.subMenu?.length > 0;

    const getLinkProps = () => {
      const href = item.externalUrl ?? item.navigateTo;
      const isExternal = !!item.externalUrl;
      return {
        href,
        target: isExternal ? "_blank" : "_self",
        rel: isExternal ? "noopener noreferrer" : undefined,
      };
    };

    return (
      <Box
        key={item.id}
        sx={{
          position: "relative",
          mx: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        {hasSubmenu ? (
          <>
            <MuiLink
              component="button"
              underline="none"
              color="inherit"
              onClick={(e) => handleMenuOpen(e, item.id)}
              sx={{
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: underlineColor,
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
            >
              {item.label}
              <ArrowDropDownIcon
                fontSize="small"
                sx={{ ml: 0.5, color: underlineColor }}
              />
            </MuiLink>
            <Popover
              open={openMenuId === item.id}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              disableRestoreFocus
              disableScrollLock
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "#1a1a2e",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    minWidth: "160px",
                    maxWidth: "200px",
                    mt: 2,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  },
                },
              }}
              onMouseLeave={handleMenuClose}
            >
              <Box sx={{ py: 1 }}>
                {item.subMenu.map((sub, index) => {
                  const href = sub.externalLink ?? sub.navigateTo;
                  const isExternal = !!sub.externalLink;

                  return (
                    <MuiLink
                      key={sub.id}
                      href={href}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={handleMenuClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 16px",
                        color: "#fff",
                        fontSize: "14px",
                        textDecoration: "none",
                        borderBottom:
                          index < item.subMenu.length - 1
                            ? "1px solid #333"
                            : "none",
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                    >
                      {sub.lable}
                    </MuiLink>
                  );
                })}
              </Box>
            </Popover>
          </>
        ) : (
          <MuiLink
            {...getLinkProps()}
            underline="none"
            color="inherit"
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: underlineColor,
                transform: "scaleX(0)",
                transition: "transform 0.3s ease",
              },
              "&:hover::after": {
                transform: "scaleX(1)",
              },
            }}
          >
            {item.label}
            {item.label === "Live" && (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  ml: 0.5,
                  width: 8,
                  height: 8,
                  bgcolor: "red",
                  borderRadius: "50%",
                }}
              />
            )}
          </MuiLink>
        )}
      </Box>
    );
  };

  const renderDrawerMenu = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#121212",
        height: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "#444" }} />
      <List>
        {[...(data.leftMenu || []), ...(data.rightMenu || [])].map((item) => {
          const hasSubmenu = item.subMenu?.length > 0;

          return (
            <Box key={item.id}>
              <ListItemButton
                onClick={
                  hasSubmenu ? () => toggleExpand(item.id) : toggleDrawer(false)
                }
                href={
                  !hasSubmenu ? item.externalUrl ?? item.navigateTo : undefined
                }
                component={!hasSubmenu ? "a" : "div"}
                target={item.externalUrl ? "_blank" : "_self"}
                rel={item.externalUrl ? "noopener noreferrer" : undefined}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {item.label}
                      {item.label === "Live" && (
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            ml: 0.5,
                            width: 8,
                            height: 8,
                            bgcolor: "red",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Box>
                  }
                />
                {hasSubmenu &&
                  (expandedMenus[item.id] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {hasSubmenu && (
                <Collapse
                  in={expandedMenus[item.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subMenu.map((sub) => {
                      const href = sub.externalLink ?? sub.navigateTo;
                      const isExternal = !!sub.externalLink;
                      return (
                        <ListItemButton
                          key={sub.id}
                          sx={{ pl: 4 }}
                          component="a"
                          href={href}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={toggleDrawer(false)}
                        >
                          <ListItemText primary={sub.lable} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            background:
              "linear-gradient(to bottom, #010a18 0%, #071020 50%, rgba(16, 26, 40, 0.4) 70%)",
            color: "#fff",
            minHeight: "64px !important",
            height: 64,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {data?.logo?.iconUrl && (
              <Box
                component="img"
                src={data.logo.iconUrl}
                alt="logo"
                loading="lazy"
                decoding="async"
                sx={{ height: isMobile ? 20 : 30 }}
              />
            )}
            {!isMobile && <>{data?.leftMenu?.map(renderMenuItem)}</>}
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {data?.rightMenu?.map(renderMenuItem)}
            </Box>
          )}
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawerMenu()}
      </Drawer>
    </>
  );
}
