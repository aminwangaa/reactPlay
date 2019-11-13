import React, { useContext, useState } from 'react';
import {TestContext} from "./index"


function Child() {
    const state: any = useContext(TestContext);
    const [num, setNum] = useState(0)
    return (
        <div>
            <button
                onClick={() => {
                    state.childChangeName("子组件名字")
                }}
            >
                子组件
            </button>
            {state.name}
            <p>子组件自身数字：{num}</p>
        </div>
    )
}

export default Child
