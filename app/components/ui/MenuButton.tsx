'use client';
import { useState } from "react";
import { IconButton, Box } from "@mui/material";

interface MenuButtonProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function MenuButton(props: MenuButtonProps) {
    const { open, setOpen } = props;

    return (
        <IconButton
            onClick={() => setOpen(!open)}
            sx={{
                width: 40,
                height: 40,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
            }}
        >
            {/* xəttlər */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 24,
                    height: 2,
                    bgcolor: 'text.primary',
                    borderRadius: 1,
                    transition: '0.3s',
                    transform: open ? 'rotate(45deg)' : 'translateY(-6px)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 24,
                    height: 2,
                    bgcolor: 'text.primary',
                    borderRadius: 1,
                    transition: '0.3s',
                    opacity: open ? 0 : 1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 24,
                    height: 2,
                    bgcolor: 'text.primary',
                    borderRadius: 1,
                    transition: '0.3s',
                    transform: open ? 'rotate(-45deg)' : 'translateY(6px)',
                }}
            />
        </IconButton>
    );
}
