from docutils import nodes
from docutils.parsers.rst import roles

def external_link_role(role, rawtext, text, lineno, inliner,
                       options={}, content=[]):
    """Link to an external URL."""
    node = nodes.raw('', '<a href="{}" target="_blank">{}</a>'.format(
                      text, text), format='html')
    return [node], []

roles.register_local_role('ext_link', external_link_role)
