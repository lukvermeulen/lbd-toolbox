import bpy
from bpy.types import Operator


class LBB_OT_Operator(Operator):
    bl_idname = "object.operator"
    bl_label = "Operator"
    bl_description = "Run an empty operator"

    @classmethod
    def poll(cls, context):
        obj = context.object

        if obj is not None:
            if obj.mode == "OBJECT":
                return True

    def execute(self, context):

        bpy.ops.mesh.primitive_cube_add()

        return {"FINISHED"}
