# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTIBILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.

from . ui.lbb_panel import LBB_PT_Panel
from . operators.lbb_operator import LBB_OT_Operator
from . operators.lbb_create_representation import LBB_OT_CreateRepresentation
from . operators.lbb_create_element import LBB_OT_CreateElement
import bpy

# plugin info
bl_info = {
    "name": "LD BIM Box",
    "author": "Luk Vermeulen",
    "description": "",
    "blender": (2, 80, 0),
    "version": (0, 0, 1),
    "location": "",
    "warning": "",
    "category": "Generic"
}


classes = (LBB_PT_Panel, LBB_OT_Operator,
           LBB_OT_CreateRepresentation, LBB_OT_CreateElement)


def register():
    for c in classes:
        bpy.utils.register_class(c)

    # text input
    bpy.types.Scene.text_input = bpy.props.StringProperty(name="Text Input")

    # dropdown input
    bpy.types.Scene.array_dropdown_index = bpy.props.EnumProperty(
        items=[
            ("0", "Wall", "A wall element"),
            ("1", "Window", "A window element"),
            ("2", "Slab", "A slab element"),
            ("3", "Door", "A door element"),
        ],
        name="Building element classes"
    )

    # topology input
    bpy.types.Scene.topology_dropdown = bpy.props.EnumProperty(
        items=[
            ("0", "Space", "A wall element"),
            ("1", "Storey", "A window element"),
            ("2", "Building", "A slab element"),
            ("3", "Site", "A door element"),
        ],
        name="Topologies"
    )


def unregister():
    for c in classes:
        bpy.utils.unregister_class(c)

    # delete properties
    del bpy.types.Scene.text_input
    del bpy.types.Scene.array_dropdown_index
