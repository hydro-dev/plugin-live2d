import { } from 'hydrooj';

const { system } = global.Hydro.model;
const {
    Handler, Route, param, Types,
} = global.Hydro.service.server;
const r18 = system.get('live2d.r18');
const def = system.get('live2d.default');

const modellist = {
    'default.v2': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2016.xmas': ['texture_01.png', 'texture_02.png', ['texture_03_1.png', 'texture_03_2.png']],
    '2017.cba-normal': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.cba-super': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.summer.super': ['texture_01.png', 'texture_02.png', ['texture_03_1.png', 'texture_03_2.png']],
    '2017.newyear': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.school': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.summer.normal': ['texture_01.png', 'texture_02.png', ['texture_03_1.png', 'texture_03_2.png']],
    '2017.tomo-bukatsu.high': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.valley': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.vdays': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2017.tomo-bukatsu.low': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2018.bls-summer': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2018.bls-winter': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2018.lover': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2018.spring': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2019.deluxe': ['texture_01.png', 'texture_02.png', ['texture_03_1.png', 'texture_03_2.png']],
    '2019.summer': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2019.bls': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2020.newyear': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
    '2018.playwater': ['texture_01.png', 'texture_02.png', 'texture_03.png'],
};
const names = Object.keys(modellist);
if (!r18) names.length -= 1;
function getTexture($modellist, $modelname, $id) {
    const $texture = $modellist[$modelname][$id];
    if ($texture instanceof Array) return $texture[Math.floor(Math.random() * 2)];
    return $texture;
}

class L2dModelHandler extends Handler {
    @param('p', Types.String, true)
    @param('id', Types.String, true)
    async get(domainId: string, $person: string, $_id: string) {
        let id: number;
        if (!Number.isSafeInteger(+$_id)) {
            id = def || Math.floor(Math.random() * names.length);
        }
        id %= names.length;
        if (!['22', '33'].includes($person)) {
            $person = ['22', '33'][Math.floor(Math.random() * 2)];
        }
        const name = names[id];
        this.response.body = {
            type: 'Live2D Model Setting',
            name: `${$person}-${name}`,
            label: $person,
            model: `${$person}/${$person}.v2.moc`,
            textures: [
                `${$person}/texture_00.png`,
                `${$person}/closet.${name}/${getTexture(modellist, name, 0)}`,
                `${$person}/closet.${name}/${getTexture(modellist, name, 1)}`,
                `${$person}/closet.${name}/${getTexture(modellist, name, 2)}`,
            ],
            hit_areas_custom: {
                head_x: [-0.35, 0.6],
                head_y: [0.19, -0.2],
                body_x: [-0.3, -0.25],
                body_y: [0.3, -0.9],
            },
            layout: {
                center_x: -0.05,
                center_y: 0.25,
                height: 2.7,
            },
            motions: {
                idle: [
                    {
                        file: `${$person}/${$person}.v2.idle-01.mtn`,
                        fade_in: 2000,
                        fade_out: 2000,
                    },

                    {
                        file: `${$person}/${$person}.v2.idle-02.mtn`,
                        fade_in: 2000,
                        fade_out: 2000,
                    },
                    {
                        file: `${$person}/${$person}.v2.idle-03.mtn`,
                        fade_in: $person == '22' ? 100 : 2000,
                        fade_out: $person == '22' ? 100 : 2000,
                    },
                ],
                tap_body: [
                    {
                        file: `${$person}/${$person}.v2.touch.mtn`,
                        fade_in: $person === '22' ? 500 : 150,
                        fade_out: $person === '22' ? 200 : 100,
                    },
                ],
                thanking: [
                    {
                        file: `${$person}/${$person}.v2.thanking.mtn`,
                        fade_in: 2000,
                        fade_out: 2000,
                    },
                ],
            },
        };
    }
}

global.Hydro.handler.live2d = () => {
    Route('live2d_api', '/live2d/api', L2dModelHandler);
};
