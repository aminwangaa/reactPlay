import React, {useContext} from 'react';
import {TestContext} from "./index"

interface Child {
    // callback: (name: string) => void
}

function Child(props: Child) {
    const state: any = useContext(TestContext);
    return (
        <div>
            <button
                onClick={() => {
                    // props.callback("子组件名字")
                    state.childChangeName("子组件名字")
                }}
            >
                子组件
            </button>
            {state.name}
        </div>
    )
}

export default Child
