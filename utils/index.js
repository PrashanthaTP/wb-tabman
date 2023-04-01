export const debug = (msg) => {
    console.log(`TabMan: ${msg}`);
};

export const ACTIONS = {
	RENAME_TAB : "RENAME_TAB",
	RENAME_TAB_COMPLETE : "RENAME_TAB_COMPLETE",
	TEST_BG_LISTENER : "TEST_BG_LISTENER",
	SHOW_NOTIFICATION:"SHOW_NOTIFICATION"
}

export const STORAGE_PRIMARY_KEY="wbtabman"
