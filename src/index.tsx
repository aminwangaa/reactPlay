import React, { useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import Child from "./child"

const TestContext = React.createContext({})
const { Provider } = TestContext
export { TestContext }

const TYPE = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
    CHANGENAME: "changeName",
    SETCOMPOSEINFO: "setComposeInfo",
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case TYPE.INCREMENT:
            // 增数操作
            return {  ...state, count: state.count + 1 }
        case TYPE.DECREMENT:
            // 减数操作
            return {  ...state, count: state.count - 1 }
        case TYPE.CHANGENAME:
            // 修改名字
            return {  ...state, name: action.payload }
        case TYPE.SETCOMPOSEINFO:
            // 设置对象信息
            return { ...state, composeInfo: action.payload }
        default:
            throw new Error()
    }
}

function countInit(count: number){
    // 初始化数字
    return { count };
}

interface Counter {
    count: number
}

function Counter(props: Counter){
    const [state, dispatch] = useReducer(reducer, props.count, countInit);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: TYPE.INCREMENT})}>+</button>
            <button onClick={() => dispatch({type: TYPE.DECREMENT})}>-</button>
        </>
    )
}

function nameInit(name: string){
    return { name };
}

function Father() {
    const [state, dispatch] = useReducer(reducer, "初始化名字", nameInit)
    const changeName = () => {
        dispatch({type: TYPE.CHANGENAME, payload: "改变个名字"})
    }

    const childChangeName = (name: string) => {
        // 子组件触发 修改名字
        dispatch({type: TYPE.CHANGENAME, payload: name})
    }
    state.childChangeName = childChangeName

    const getComposeInfo = async () => {
        // 假装从接口获取数据 存放到state中
        const composeObj = {
            composeId: "MuJ888",
            title: "这是一个作品",
            image: "//wscdn.xiaoma.cn//72/dc/74/72dc74f7267fdd8e08faa5db556ff0aa6c5c2ff2.png?width=508&height=390&op=imageView2&mode=2",
            isSsue: 1,
            statObj: {
                viewnum: 100,
                replynum: 5,
                likenum: 20
            }
        }
        await dispatch({type: TYPE.SETCOMPOSEINFO, payload: composeObj})
    }

    useEffect(() => {
        // componentDidMount 获取接口数据 存到state中
        getComposeInfo()
    }, [])
    return (
        <div>
            <Provider value={state}>
                <button onClick={changeName}>
                    父组件
                    {state.name}
                </button>
                {/*props的数据可通过context传递*/}
                <Counter count={8} />
                <Child />
            </Provider>
        </div>
    )
}

ReactDOM.render(<Father />, document.getElementById('root')!);
