import {
    Stack,
    Typography,
    IconButton
} from "@mui/material";
import {
    Megaphone
} from "lucide-react";

export type NotificationProps = {
    infoName: string;
    infoContent: string;
}

export const Notification = (props: NotificationProps) => {
    return (
        <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={3}
            pl={1.5}
            pr={2}
            py={2}
            mt={1.5}
            sx={{
                border: "1px solid #2c46a9",
                backgroundColor: "#192d7a",
                borderRadius: "15px",
                borderBottomLeftRadius: "3px",
                height:"fit-content",
            }}
        >
            <IconButton
                sx={{backgroundColor: "#5664e3"}}
            >
                <Megaphone color={"#fff"}/>
            </IconButton>
            <Stack
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                spacing={1}
            >
                <Typography
                    color={"#99a5d6"}
                    sx={{fontSize: "10px"}}
                    lineHeight={"1.2em"}
                >
                    お知らせ
                </Typography>
                <Typography
                    color={"#E8EBF8"}
                    sx={{fontSize: "14px"}}
                    lineHeight={"1.2em"}
                >
                    {props.infoContent}
                </Typography>
            </Stack>
        </Stack>
    )
}