import { AppBar, Box, Toolbar, Popover, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import type { HeaderProps, MenuItem as MenuItemType } from "./Header.types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {
  data: HeaderProps;
};

export default function Header({ data }: Props) {
  const { styles } = data;
  const underlineColor = styles?.underlineColor || "#FFD700";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
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
                sx={{
                  ml: 0.5,
                  color: underlineColor,
                }}
              />
            </MuiLink>
            <Popover
              open={openMenuId === item.id}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              disableRestoreFocus
              disableScrollLock
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
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
                    overflow: "visible",
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

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: 4,
          // background: "linear-gradient(90deg, #0A0A23 0%, #0D1036 100%)",
          backgroundColor: "#000000",
          color: "#fff",
          minHeight: "64px !important",
          height: 64,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {data?.logo?.iconUrl && (
            <Box
              component="img"
              src={data?.logo?.iconUrl}
              alt="logo"
              loading="lazy"
              decoding="async"
              sx={{
                height: 32,
                display: "block",
              }}
            />
          )}
          {data?.leftMenu?.map(renderMenuItem)}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {data?.rightMenu?.map(renderMenuItem)}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
