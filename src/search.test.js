import {searchFilter} from "./serach";

const MESH_OBJ = {
    "type": "Mesh",
    "uuid": "6159476a-3b31-5a0f-ba46-d251dca70503",
    "name": "3DBread001_LowPoly\\3DBread001_LowPoly.obj",
    "input_path": "3DBread001_LowPoly\\3DBread001_LowPoly.obj",
    "updated_at": "2020-12-01T00:30:46.424995500Z",
    "tags": ["mesh"],
    "index_type": null,
    "vertex_format": null,
    "object_name": null,
    "geometry_index": null,
    "lod": null,
    "recalculate_normals": false
};

test('search obj using 3DBread001_LowPoly', () => {
    expect(searchFilter('3DBread001_LowPoly')(MESH_OBJ)).toBe(true);
    expect(searchFilter('apple')(MESH_OBJ)).toBe(false);
});

test('search by uuid', () => {
    expect(searchFilter('615947')(MESH_OBJ)).toBe(true);
    expect(searchFilter('ca70503')(MESH_OBJ)).toBe(true);
    expect(searchFilter('6159476a-3b31-5a0f-ba46-d251dca70503')(MESH_OBJ)).toBe(true);

    expect(searchFilter('3159476a-3b31-5a0f-ba46-d251dca70503')(MESH_OBJ)).toBe(false);
    expect(searchFilter('da70503')(MESH_OBJ)).toBe(false);
});
