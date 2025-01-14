import {Box, Container, Stack, Tab, Tabs, Typography} from "@mui/material";
import * as React from "react";
import {GameListContent} from "./GameListContent";
import {useContext, useEffect} from "react";
import {GamesContext} from "../../context";
import {motion} from "framer-motion";

export type GameListProps = {
    sportId: number
    gameId: number | null
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    spacing={3}
                >
                    {children}
                </Stack>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const GameList = (props: GameListProps) => {
    const {data: games} = useContext(GamesContext)
    const [value, setValue] = React.useState(0);

    const sortedGame = games.sort((a, b) => b.weight - a.weight)

    useEffect(() => {
        //  set tab value if game id not undefined
        if (props.gameId) {
            const index = sortedGame.findIndex(game => game.id === props.gameId)
            if (index !== -1) {
                setValue(index)
            }
        }
    }, [sortedGame, props.gameId])


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                paddingTop: "0px",
                height: "fit-content",
                position: "relative",
                bottom: "-40px"
            }}
        >
            <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={3}
                minHeight={"50vh"}
                sx={{
                    position: "relative",
                    width: "101vw",
                    height: "fit-content",
                    backgroundColor: "#23398a",
                }}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    spacing={3}
                    width={"100vw"}
                >
                    <Stack
                        width={"100%"}
                        maxWidth={"xl"}
                        sx={{px: 2, pb: 3, pt: 4}}
                        spacing={5}
                    >
                        <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                            対戦一覧
                        </Typography>
                        <Box sx={{
                            width: '100vw',
                            position: "relative",
                            pr: 2.5,
                        }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant={"scrollable"}
                                scrollButtons={false}
                                aria-label="basic tabs example"
                                TabIndicatorProps={{
                                    style: {
                                        zIndex: 0,
                                        backgroundColor: '#FFF',
                                        borderRadius: '24px',
                                        height: '49px',
                                    }
                                }}
                            >
                                {sortedGame.map((game, index) => {
                                    return (
                                        <Tab sx={{
                                            zIndex: 1,
                                            px: 1.8,
                                            mr: -2,
                                            color: "#99a5d6",
                                            border: "1px solid #FFF",
                                            borderRadius: "24px"
                                        }} key={game.id} label={game.name} {...a11yProps(index)} />
                                    )
                                })}
                            </Tabs>
                        </Box>
                        {sortedGame.map((game, index) => {
                                return (
                                    <TabPanel key={game.id} value={value} index={index}>
                                        <motion.div
                                            key={"overview-content"}
                                            initial={{opacity: 0.3, y: "-20px"}}
                                            animate={{opacity: 1, y: "0px"}}
                                            transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
                                        >
                                            <GameListContent game={game}/>
                                        </motion.div>
                                    </TabPanel>
                                )
                            })
                        }

                    </Stack>
                    <Typography sx={{color: "#99a5d6", fontSize: "14px"}}>
                        対戦が終了すると項目が追加されます
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    )
}